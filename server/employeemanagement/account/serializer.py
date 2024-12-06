from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model=User
        fields=['first_name','email','username','password','place','company','phone']

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class FieldChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FieldChoice
        fields = '__all__'

# Fields Serializer
class FieldsSerializer(serializers.ModelSerializer):
    # Include nested choices in read operations
    choices = FieldChoiceSerializer(many=True, read_only=True)

    class Meta:
        model = Fields
        fields = '__all__'


class FormSerializer(serializers.ModelSerializer):
    user=serializers.CharField(read_only=True)
    fields = FieldsSerializer(many=True, read_only=True, source="fields_set")

    class Meta:
        model = Form
        fields = '__all__'

class FormResponseSerializer(serializers.ModelSerializer):

 
    form_name = serializers.SerializerMethodField()
    field_label = serializers.SerializerMethodField()

    class Meta:
        model = FormResponse
        fields = ['id', 'form', 'form_name', 'field', 'field_label', 'value','unique_id']

    def get_form_name(self, obj):
        return obj.form.name  # Assuming your Form model has a 'name' field

    def get_field_label(self, obj):
        return obj.field.label
    
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)