#install gitlab runner
FROM gitlab/gitlab-runner:latest

#install docker
#RUN curl -fsSL https://get.docker.com | shjughy
RUN apt-get update
RUN apt-cache policy docker-ce
#RUN apt-get install docker-ce=5:18.09.9~3–0~ubuntu-bionic docker-ce-cli=5:18.09.9~3–0~ubuntu-bionic containerd.io
#RUN docker run hello-world
#docker as service
#RUN systemctl list-unit-files --type=service
#test docker
#RUN docker version
# register runner
RUN gitlab-runner register \
	--non-interactive \
    --executor "docker" \
	--docker-image "alpine:latest" \
    --url "https://gitlab.com/" \
    --token "glrt-E1zY9nS1nJmAG7zcvsMU" \
	--description "ecs-runner"
#copy runner configuration
#COPY config.toml /etc/gitlab-runner/config.toml
#COPY fargate.toml /etc/gitlab-runner/fargate.toml

CMD echo "hello"
CMD ["run", "--user=ec2-user", "--working-directory=/home/gitlab-runner"]