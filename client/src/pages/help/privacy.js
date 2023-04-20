import { Main, HelpContainer, Head } from "@/components";

export default function HelpOverview() {
  return (
    <>
      <Head title={"Help Center"} description={"Head from about"} />
      <Main mode="transparent">
        <HelpContainer
          title="Politica de privacidad"
          paragraph="En nuestra plataforma, nos tomamos muy en serio la privacidad de nuestros usuarios y nos comprometemos a proteger la información personal que compartes con nosotros. Nuestra política de privacidad detalla cómo recopilamos, utilizamos, divulgamos y protegemos tu información personal, así como tus derechos y opciones en cuanto a su uso. "
        >
          <p className="text-base-light color-neutral-black-900">
            <span className="text-titulo3-semibold text-red-700 ">
              Politica de privacidad
            </span>
            <br />
            <br />
            En BeatConnect, nos tomamos muy en serio la privacidad de nuestros
            usuarios y nos comprometemos a proteger la información personal que
            compartes con nosotros. En esta política de privacidad, detallamos
            cómo recopilamos, utilizamos, divulgamos y protegemos tu información
            personal, así como tus derechos y opciones en cuanto a su uso. Al
            utilizar nuestra plataforma, aceptas nuestra política de privacidad
            y nuestras prácticas de manejo de información personal.
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
              Información que recopilamos
            </span>
            <br />
            <br />
            Recopilamos información personal que nos proporcionas directamente,
            como tu nombre, dirección de correo electrónico y dirección de
            facturación. También podemos recopilar información sobre tus
            interacciones con nuestra plataforma, como las páginas que visitas y
            las acciones que realizas en la plataforma.
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
              ¿Cómo utilizamos tu información personal?
            </span>
            <br />
            <br />
            Utilizamos tu información personal para proporcionarte acceso a
            nuestra plataforma y mejorar la experiencia del usuario. También
            podemos utilizar tu información para comunicarnos contigo sobre
            actualizaciones y ofertas especiales, y para procesar tus
            transacciones en la plataforma.
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
              ¿Cómo protegemos tu información personal?
            </span>
            <br />
            <br />
            Nos comprometemos a proteger tu información personal utilizando
            medidas de seguridad físicas, técnicas y administrativas adecuadas.
            Esto incluye el uso de encriptación de datos y el control de acceso
            a la información personal.
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
              Divulgación de tu información
            </span>
            <br />
            <br />
            Podemos compartir tu información personal con terceros que prestan
            servicios en nuestro nombre, como proveedores de pagos y servicios
            de cumplimiento de pedidos. También podemos divulgar tu información
            personal en respuesta a una solicitud legal o si creemos que la
            divulgación es necesaria para proteger nuestros derechos, la
            seguridad de nuestros usuarios o el público en general.
            <br />
            <br />
            <span className="text-titulo3-semibold text-red-700 ">
              Tus derechos y opciones
            </span>
            <br />
            <br />
            Puedes elegir no proporcionar cierta información personal, pero esto
            puede limitar tu capacidad para utilizar nuestra plataforma. También
            tienes ciertos derechos en relación con tu información personal,
            como el derecho a acceder, corregir y eliminar tu información
            personal.
          </p>
        </HelpContainer>
      </Main>
    </>
  );
}
