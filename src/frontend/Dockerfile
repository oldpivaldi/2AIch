FROM node:20 as build
COPY . .

RUN yarn 
RUN yarn build

FROM nginx:1.11.12
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /dist /srv/www/web
CMD ["nginx", "-g", "daemon off;"]
