#install gitlab runner
FROM gitlab/gitlab-runner:latest

#install fargate driver
RUN mkdir -p /opt/gitlab-runner/metadata /opt/gitlab-runner/builds /opt/gitlab-runner/cache \ 
    && curl -Lo /opt/gitlab-runner/fargate https://gitlab-runner-custom-fargate-downloads.s3.amazonaws.com/latest/fargate-linux-amd64 \ 
    && chmod +x /opt/gitlab-runner/fargate
#register runner
RUN gitlab-runner register
    --non-interactive \
    --executor "custom" \
    --url "$GITLAB_HOST_URL" \
    --token "$GITLAB_RUNNER_TOKEN" \
	--description "$GITLAB_RUNNER_NAME"
#copy runner configuration
#COPY config.toml /etc/gitlab-runner/config.toml
COPY fargate.toml /etc/gitlab-runner/fargate.toml

#terminal open working directory
CMD ["run", "--user=ec2-user", "--working-directory=/home/gitlab-runner"]