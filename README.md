# Nest.js CRUD

CRUD (Create, Read, Update, Delete) of users starter template.

---

**Tabla de contenidos**

-   [Setup](#Setup)
-   [Endpoints](#endpoints)
    -   [Get users (GET)](#get-users---get)
    -   [Get user (GET)](#get-user-get)
    -   [Crear user (POST)](#crear-user-post)
    -   [Update user (PATCH)](#update-user-patch)
-   [Documentation](#documentation)
    -   [MVC - Modelo Vista Controlador](#mvc---Modelo-Vista-Controlador)
    -   [API Prefix](#api-prefix)
    -   [Encapsulamiento de respuesta](#encapsulamiento-de-respuesta)
    -   [Response DTO](#response-dto)
    -   [Manejo de errores](#manejo-de-errores)
    -   [Password Hash](#password-hash)

---

## Setup

1. Descargar Docker Desktop https://www.docker.com/products/docker-desktop/
2. Descargar Postman https://www.postman.com/downloads/
3. Clonar repo

```shell
git clone git@github.com:alemartinezz/challenge-cenco.git
```

4. Entrar al repo y correr docker compose

```shell
cd challenge-cenco
```

```shell
docker-compose build --no-cache && docker-compose up --remove-orphans
```

## Endpoints

### Get users (GET)

**Request**

```shell
localhost:3000/api/user/?limit=3&offset=0
```

**Response body**

```shell
{
    "users": [
        {
            "id": "a7f5e1fd-ce71-43d7-a4d3-7c65a6a04366",
            "username": "user1",
            "email": "user1@example.com",
            "createdAt": "2023-11-25T04:58:15.503Z",
            "updatedAt": "2023-11-25T04:58:15.503Z"
        },
        {
            "id": "42ce8c14-efd5-46b6-9145-1f6fce3e402a",
            "username": "user2",
            "email": "user2@example.com",
            "createdAt": "2023-11-25T04:58:15.517Z",
            "updatedAt": "2023-11-25T04:58:15.517Z"
        },
        {
            "id": "e55f7799-a2f9-4724-b9d5-306d07508176",
            "username": "user3",
            "email": "user3@example.com",
            "createdAt": "2023-11-25T04:58:15.524Z",
            "updatedAt": "2023-11-25T04:58:15.524Z"
        }
    ]
}
```

### Get user (GET)

**Request**

```shell
localhost:3000/api/user/a7f5e1fd-ce71-43d7-a4d3-7c65a6a04366
```

**Response body**

```shell
{
    "user": {
        "id": "a7f5e1fd-ce71-43d7-a4d3-7c65a6a04366",
        "username": "user1",
        "email": "user1@example.com",
        "createdAt": "2023-11-25T04:58:15.503Z",
        "updatedAt": "2023-11-25T04:58:15.503Z"
    }
}
```

### Crear user (POST)

**Request URL**

```shell
localhost:3000/api/user
```

**Request body**

```shell
{
    "username": "Victor",
    "email": "alejandromartinezcornes@gmail.com",
    "password": "Makiaveliko23_"
}
```

**Response body**

```shell
{
    "user": {
        "username": "Victor",
        "email": "alejandromartinezcornes@gmail.com",
        "id": "90ec2b7c-463a-4ad5-becf-56cef2433c34",
        "createdAt": "2023-11-25T14:23:26.322Z",
        "updatedAt": "2023-11-25T14:23:26.322Z"
    }
}
```

### Update user (PATCH)

**Endpoint**

```shell
localhost:3000/api/user/a7f5e1fd-ce71-43d7-a4d3-7c65a6a04366
```

**Request body**

```json
{
	"username": "Andy",
	"email": "emailchanged@mail.com"
}
```

**Response body**

```shell
{
    "user": {
        "id": "a7f5e1fd-ce71-43d7-a4d3-7c65a6a04366",
        "username": "Andy",
        "email": "emailchanged@mail.com",
        "createdAt": "2023-11-25T04:58:15.503Z",
        "updatedAt": "2023-11-25T19:47:39.669Z"
    }
}
```

## Documentación

### MVC - Modelo Vista Controlador

-   **Modelo** **Entidades (`entities`)**: Aquí es donde se definen los modelos de datos. En este caso, `user.entity.ts` actúa como el modelo en el patrón MVC, representando la estructura de datos.

-   **Vista** En Nest.js las vistas son respuestas por `JSON`. Los `DTO`s pueden considerarse una parte de la capa de vista, ya que definen cómo se estructuran y presentan los datos en las respuestas de la API.

-   **Controlador** Los archivos como `user.controller.ts` y `app.controller.ts` son controladores en el sentido clásico de MVC. Se encargan de manejar las solicitudes entrantes, interactuar con la lógica de negocio (a través de los servicios), y devolver las respuestas adecuadas.

-   **Servicios** **Servicios (`*.service.ts`)**: Aunque no son parte del patrón MVC tradicional, los servicios en Nest.js, como `user.service.ts`, son cruciales para la separación de la lógica de negocio de los controladores. Ayudan a mantener los controladores enfocados en el manejo de solicitudes
    y respuestas, delegando la lógica de negocio y la interacción con la base de datos a los servicios.

Aunque también se pueden utilizar otros patrones de diseño, Nest.js aplica por defecto con el patrón MVC. Tiene la ventaja de ser bien conocido por los desarrolladores, y esto facilita la colaboración. Tambien facilita utilizar las herramientas nativas de Nest.js como
`npx nest generate resources <resource_name>`, que crea todos los archivos necesarios de acuerdo a este patrón.

### API Prefix

Se establece el prefijo `/api` como practica para diferenciar el dominio de negocio del recurso utilizado por la API.

```shell
localhost:3000/api
```

### Encapsulamiento de respuesta

Todas las respuestas son encapsuladas en una key, referente al recurso solicitado. Ejemplo: la informacion sobre la creacion de un user se devuelve en la key `user`, asi como la de multiples users en `users`. Esto es una buena práctica en el diseño de APIs REST, ya que proporciona una estructura
coherente y predecible en las respuestas.

```json
{
	"user": {
		"id": "a7f5e1fd-ce71-43d7-a4d3-7c65a6a04366",
		"username": "user1",
		"email": "user1@example.com",
		"createdAt": "2023-11-25T04:58:15.503Z",
		"updatedAt": "2023-11-25T04:58:15.503Z"
	}
}
```

```json
{
	"users": [
		{
			"id": "a7f5e1fd-ce71-43d7-a4d3-7c65a6a04366",
			"username": "user1",
			"email": "user1@example.com",
			"createdAt": "2023-11-25T04:58:15.503Z",
			"updatedAt": "2023-11-25T04:58:15.503Z"
		},
		{
			"id": "42ce8c14-efd5-46b6-9145-1f6fce3e402a",
			"username": "user2",
			"email": "user2@example.com",
			"createdAt": "2023-11-25T04:58:15.517Z",
			"updatedAt": "2023-11-25T04:58:15.517Z"
		}
	]
}
```

### Response DTO

Para evitar retornar datos sensibles en la respuesta, como la contrasena de un user, se crea un DTO especifico para esa respuesta, mediante la funcion `toUserDto` y se aplica en todos los endpoints que retornen un user. Ej:

```typescript
export function toUserDto(user: User): UserDto {
	const { password, ...userDto } = user;
	return userDto;
}
```

### Manejo de errores

Los errores son manejados gracias a las validaciones de `requestBody` que hacen los `DTO`s, como por ejemplo, `CreateUserDto`. Retornando los mensajes correspondientes en el `responseBody.message`.

**Request body**

```json
{
	"email": "alejandromartinezcornes2@gmail.com",
	"password": "Makiaveliko23_"
}
```

**Response body**

```json
{
	"message": ["username must be longer than or equal to 4 characters", "username must be a string", "username should not be empty"],
	"error": "Bad Request",
	"statusCode": 400
}
```

**Input correcto**

```json
{
	"username": "mariobros",
	"email": "alejandromartinezcornes2@gmail.com",
	"password": "Makiaveliko23_"
}
```

### Password Hash

Para garantizar la seguridad de las contraseñas de los users, utilizamos la biblioteca `bcrypt` para hashear las contraseñas.

```typescript
export async function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	const hash = await bcrypt.hash(password, saltRounds);
	return hash;
}
```

`saltRounds` es una medida de cuánto tiempo y recursos se necesitan para generar un hash. Un valor más alto significa que el proceso es más lento y computacionalmente más costoso, lo que a su vez hace que sea más difícil y que requiera más tiempo para un atacante romper o adivinar el hash.

En nuestra implementación, hemos configurado `saltRounds` en 10, lo que ofrece un buen equilibrio entre seguridad y rendimiento. Esto garantiza que las contraseñas estén bien protegidas, sin causar una demora significativa en el procesamiento de las solicitudes de los users.
