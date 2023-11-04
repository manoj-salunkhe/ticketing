import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // WE ARE ON THE SERVER !!
    // EX ==> http://(SERVICE NAME).(INGRESS NAMESPACE).svc.cluster.local/URL
    // REQUEST CAN BE MADE WITH TO "http://ingress-nginx-controller.ingress-nginx/api/users/currentuser"
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // WE ARE ON THE BROWSER !!
    // REQUEST CAN BE MADE WITH A ABASE URL OF ''
    return axios.create({
      baseURL: "/",
    });
  }
};

export default buildClient;
