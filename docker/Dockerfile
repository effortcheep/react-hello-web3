FROM nginx:1.19

EXPOSE 8080

COPY ./config/nginx/nginx.conf /etc/ngin/conf.d/default.conf
COPY buil /usr/share/ngin/html

CMD ["nginx", "-g", "daemon off;"]