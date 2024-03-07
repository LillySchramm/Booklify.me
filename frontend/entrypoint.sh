#!/bin/bash

cat <<EOT >> /usr/local/apache2/htdocs/assets/config.json
{
  "backend": "${BACKEND_URL:-}"
}
EOT

cat /usr/local/apache2/htdocs/assets/config.json

httpd-foreground

