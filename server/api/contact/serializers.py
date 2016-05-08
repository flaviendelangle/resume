from django.core.mail   import send_mail

from rest_framework     import serializers

class ContactSerializer(serializers.Serializer):

    email   = serializers.EmailField(max_length=254)
    name    = serializers.CharField(max_length=254)
    company = serializers.CharField(max_length=254)
    message = serializers.CharField(max_length=16384)

    def create(self, validated_data):
        subject = 'Message from ' + validated_data['name']
        message = validated_data['message']
        sender = validated_data['email']
        receiver = 'flaviendelangle@gmail.com'
        send_mail(subject, message, sender, [receiver], fail_silently=False)