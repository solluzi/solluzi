FROM php:8.4-fpm-alpine

# Dependências para PHP e ambiente de dev
RUN apk add --no-cache \
        bash \
        git \
        unzip \
        curl \
        nano \
        icu-dev \
        libzip-dev \
        oniguruma-dev \
        zlib-dev \
        gettext-dev \
        postgresql-dev \
    && docker-php-ext-install intl pdo pdo_mysql pgsql pdo_pgsql zip opcache gettext
#    && apk del gettext-dev postgresql-dev
# Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copia configuração personalizada do PHP para dev
COPY ./php.ini /usr/local/etc/php/php.ini

ENV TZ=America/Sao_Paulo

# Diretório da app
WORKDIR /var/www/html

# Copia código (em dev você pode usar volumes ao invés disso)
# COPY . .

# Permissões
RUN chown -R www-data:www-data /var/www/html

EXPOSE 9000

CMD ["php-fpm"]
