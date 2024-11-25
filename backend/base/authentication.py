from rest_framework_simplejwt.authentication import JWTAuthentication

# Custom JWT Authentication class that retrieves the token from cookies
class CookiesJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
         # Get the access token from the cookies
        access_token = request.COOKIES.get('access_token')
        
        # (no authentication)
        if not access_token:
            return None
        
        validated_token = self.get_validated_token(access_token)

        try:
            user = self.get_user(validated_token)
        except:
            return None

        return(user, validated_token)
    
    