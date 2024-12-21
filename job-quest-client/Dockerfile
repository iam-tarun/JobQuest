# use the official nginx base image
FROM nginx:latest

# change the working directory
WORKDIR /usr/share/nginx/html

# remove the default nginx static content
RUN rm -rf ./*

COPY /jobquest-build/ ./jobquest/

COPY /portfolio-build/ ./portfolio/

COPY /nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


