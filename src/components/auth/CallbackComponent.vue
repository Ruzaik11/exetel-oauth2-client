<template>
  <p>Got the call..</p>
</template>

<script>
import axios from "axios";
// import { mutations } from '@/store';
export default {
  mounted() {
    var cookie_code = "KAUKSe4c7iHn49H6lPt3J4nssei1aProFRIhQd46";
    if (this.$route.query.state && this.$route.query.state == cookie_code) {
      axios
        .post(process.env.OAUTH_SERVER + "/oauth/token", {
          grant_type: "authorization_code",
          client_id: process.env.OAUTH_CLIENT_ID,
          client_secret: process.env.OAUTH_CLIENT_SECRET,
          redirect_uri: process.env.OAUTH_CLIENT_REDIRECT,
          code: this.$route.query.code,
        })
        .then((response) => {
              window.localStorage.setItem('accessToken', response.data.access_token);
              window.localStorage.setItem('refreshToken', response.data.refresh_token);
              window.localStorage.setItem('expires_in', response.data.expires_in);
              this.$router.push('/customers');

        })
        .catch((error) => {
            alert("login failed");
            this.$router.push('/Home');
        })
        
    }
  },
};
</script>
