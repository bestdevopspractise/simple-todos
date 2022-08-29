FROM node:alpine as builder

#Working directory for the node app
WORKDIR /usr/src/app

#Copy the application files to the container directory
COPY . /usr/src/app

## Install build toolchain, install node deps and compile native add-ons
RUN npm install 

#Second stage build
FROM node:alpine as app

## Copy built node modules and binaries without including the toolchain
COPY --from=builder /usr/src/app .

# default run command
CMD npm run start