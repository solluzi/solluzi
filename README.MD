# SOLLUZI FRAMEWORK 
## Este documento tem como finalidade mostrat como trabralhar com este framework

## Primeiro quero mostrar como usar a query builder
### Select completo
```php
$model = new Model();
$users = $model->select('id, name, email')
               ->where('id', '=', 1)
               ->orWhere('id', '=', 2)
               ->whereBetween('age', 18, 30)
               ->whereIn('city', ['New York', 'London', 'Paris'])
               ->groupBy('city')
               ->having('count(*)', '>', 1)
               ->join('orders', 'users.id', '=', 'orders.user_id')
               ->leftJoin('addresses', 'users.id', '=', 'addresses.user_id')
               ->rightJoin('payments', 'users.id', '=', 'payments.user_id')
               ->whereNull('orders.id')
               ->whereNotNull('payments.id')
               ->orderBy('name', 'DESC')
               ->limit(10, 20)
               ->get();
```
### Create newu user
```php
$newUser = $model->insert([
                'name'  => 'John Doe',
                'email' => 'johndoe@example.com',
                'age'   => 25
           ]);
```
### Update User
```php
$updatedRows = $model->where('id', '=', 1)
                     ->update(['name' => 'Jane Doe', 'age' => 30]);
```
### Delete Users
```php
$deletedRows = $model->where('id', '=', 1)->delete();
```

### Count Users
```php
$userCount = $model->where('age', '>', 18)->count();
```

### Call Procedure
```php
$orders = $model->callProcedure('get_orders_by_user', [1]);
```
### Select Function
```php
$totalAmount = $model->selectFunction('sum', ['amount']);
```
### Select View
```php
$usersView = $model->selectView('users_view');
```