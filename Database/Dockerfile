FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=kompetisiku

# Copy semua file SQL ke dalam direktori initdb
COPY ./backup/ /docker-entrypoint-initdb.d/