FROM node:12.18.3
WORKDIR /omega-frontend
COPY ./ /omega-frontend
RUN npm install \
    npm rebuild node-sass
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "start" ]