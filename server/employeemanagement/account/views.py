from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Form, Fields, FieldChoice
from .serializer import *
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import check_password
from rest_framework.decorators import action




class UserCreationView(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset=User.objects.all()
    serializer_class=UserSerializer

    @action(detail=False, methods=['post'])
    def change_password(self, request):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            old_password = serializer.validated_data['old_password']
            new_password = serializer.validated_data['new_password']

           
            if not check_password(old_password, user.password):
                return Response(
                    {"error": "Old password is incorrect."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            user.set_password(new_password)
            user.save()
            return Response( "Password changed successfully!")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        user=request.user
        table=User.objects.get(id=user.id)
        serializer = UserSerializer(table)
        return Response(serializer.data)


class FormViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Form.objects.all()
    serializer_class = FormSerializer

    def list(self, request, *args, **kwargs):
        user=request.user
        form=Form.objects.filter(user_id=user.id)
        serializer = FormSerializer(form,many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        user=request.user
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        form = serializer.save(user=user)

    
        fields_data = request.data.get('fields', [])
        for field_data in fields_data:
            choices_data = field_data.pop('choices', [])
            field_data['form'] = form.id  
            field_serializer = FieldsSerializer(data=field_data)
            field_serializer.is_valid(raise_exception=True)
            field = field_serializer.save()

     
            for choice_data in choices_data:
                choice_data['field'] = field.id
                choice_serializer = FieldChoiceSerializer(data=choice_data)
                choice_serializer.is_valid(raise_exception=True)
                choice_serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

   
    def retrieve(self, request, *args, **kwargs):
        form = self.get_object()
        serializer = self.get_serializer(form)
        return Response(serializer.data)


class FieldsViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Fields.objects.all()
    serializer_class = FieldsSerializer


class FieldChoiceViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = FieldChoice.objects.all()
    serializer_class = FieldChoiceSerializer



class SubmitFormView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request, *args, **kwargs):
    
        form_id = kwargs.get('id')
        form = Form.objects.filter(id=form_id).first()
        form_response_table=FormResponse.objects.all().last()
        if form_response_table:
            unique_id=form_response_table.unique_id
            if unique_id is not None:
                
                count=unique_id+1
            else:
                count=1
        else:
            count=1

        if not form:
            return Response({"error": "Form not found"}, status=status.HTTP_404_NOT_FOUND)

        responses = request.data
        if not responses:
            return Response({"error": "No responses provided"}, status=status.HTTP_400_BAD_REQUEST)
        for response in responses:
            response['form'] = form_id 
            response['unique_id'] =count
            serializer = FormResponseSerializer(data=response)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

       
        return Response({"message": "Form submitted successfully!"}, status=status.HTTP_201_CREATED)
    

    def get(self, request, *args, **kwargs):
      
        form_ids = kwargs.get('id')
        data = []

        form_responses=Fields.objects.filter(form_id=form_ids)
        formtable=FormResponse.objects.filter(form_id=form_ids)
        label=[]
        label_value=[]
        unique_id=[]
        for i in form_responses:
            label.append(i.label)

        for i in formtable:
            label_value.append(i.value)
            unique_id.append(i.unique_id)
        count=form_responses.count()
        
        grouped_data=[label_value[i:i+count] for i in range(0,len(label_value),count)]
        result=[dict(zip(label,values)) for values in grouped_data]
        unique_number = sorted(set(unique_id)) 
        result = [{"id": unique_number[i], **item} for i, item in enumerate(result)]
        return Response(result)

    def delete(self, request, *args, **kwargs):
        id=kwargs.get('id')
        table_data=FormResponse.objects.filter(unique_id=id)
        table_data.delete()
        return Response(data='data deleted')
      