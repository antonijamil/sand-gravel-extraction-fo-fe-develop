FROM nginx:1.17.1-alpine
COPY helpers/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY dist/sand-gravel-extraction-fo-fe /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
