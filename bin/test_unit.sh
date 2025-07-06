#!/bin/bash -e

vendor/bin/phpunit --testsuite uadmin,ulog,ublog,ufinance,ustock \
                   --whitelist src/Admin/Model \
                   --whitelist src/Log/Model \
                   --whitelist src/Finance/Model \
                   --whitelist src/Stock/Model \
                   --whitelist src/Service/Model \
                   --whitelist src/Crm/Model \
                   --whitelist src/Blog/Model \
                   --coverage-html tests/_output