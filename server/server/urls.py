from django.conf                import settings
from django.conf.urls           import include, url
from django.conf.urls.static    import static
from django.contrib             import admin
from django.views.generic.base  import TemplateView

from rest_framework.routers     import DefaultRouter

import os

from api.contact.views 			import ContactViewSet

router = DefaultRouter()

router.register(r'^contact', ContactViewSet, base_name="contact")

urlpatterns = [
    url(r'^api/', include(router.urls)),
    url(r'^$', TemplateView.as_view(template_name="index.html")),
] + static('/', document_root=settings.FRONTEND_DIR)

