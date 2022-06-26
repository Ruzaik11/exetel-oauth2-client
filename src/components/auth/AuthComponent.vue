<template>
  <p>Connecting to OAuth2 server please wait..</p>
</template>

<script>
//import axios from "axios";
// import { mutations } from '@/store';
export default {
  mounted() {
    var url = `${process.env.OAUTH_SERVER}/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}`;
    url += `&redirect_uri=${process.env.OAUTH_CLIENT_REDIRECT}`;
    url += `&response_type=code`;
    url += `&scope=*`;
    url += `&state=KAUKSe4c7iHn49H6lPt3J4nssei1aProFRIhQd46`;
    window.location = url;
  },
};
</script>
