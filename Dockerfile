FROM node:alpine
COPY . /CURD
WORKDIR /CURD
CMD npm run start

# // docker build -t imageName .  // docker build command
# docker images // docker image list show command
# docker run imageName // docker run image
# docker tag imageId username/imageName // making image ready for push
# docker push username/imageName // pushing into dockerhub
# docker pull username/imageName // pulling from dockerhub
