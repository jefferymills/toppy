FROM mysql:5.6

ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE toppy
ENV MYSQL_USER toppy_user
ENV MYSQL_PASSWORD toppy123

ADD a-setup.sql /docker-entrypoint-initdb.d
ADD b-setup-christmas-song-seed.sql /docker-entrypoint-initdb.d