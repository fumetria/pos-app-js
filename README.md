# Proyecto - Creación de una aplicación TPV para hosteleria

En este proyecto hemos creado una aplicación terminal punto de venta de TPV para la hostelería.

La idea es crear un sistema de TPV donde la aplicación esta en la nube y el usuario se conecta a nuestra app donde puede generar tickets y luego imprimir estos tickets en una impresora local. Además de poder cobrar al cliente.

Para poder imprimir los tickets hemos creado un servidor local que gestiona todas las peticiones a la impresora termica que tenemos instalada.

## Tecnologías utilizadas

- [React](https://react.dev/)
- [Tailwind CSS](https://docs.fontawesome.com/v5/web/use-with/react)
- [MockAPI](mockapi.io)
- [Font Awesome React](https://docs.fontawesome.com/v5/web/use-with/react)

## Instalación

```shell
pnpm install
pnpm run dev
```

Si no tenemos PNPM instalado:

```shell
npm install -g pnpm
```

## Printer server

Para ejectuar nuestro servidor de impresión:

```
cd /printer-server
npm install
```

Copiamos el _.env.example_ a _.env_ y modificamos las variable de enterno conforme a nuestra configuración.

```
npm start
```
