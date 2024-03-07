FROM registry.cdev.nexus/devops/httpd-singlepage:latest

COPY ./entrypoint.sh /entrypoint.sh

COPY dist/frontend /usr/local/apache2/htdocs/

CMD ["/bin/sh", "/entrypoint.sh"]