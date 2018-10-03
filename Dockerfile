FROM node:latest
WORKDIR /app
COPY . ./

COPY ./start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

EXPOSE 8080

ENTRYPOINT ["start.sh"]