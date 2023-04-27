import { Main, HelpContainer, Head } from "@/components";

export default function HelpOverview() {
  return (
    <>
      <Head title={"Help Center"} description={"Head from about"} />
      <Main mode="transparent">
        <HelpContainer
          title="Terminos de BeatConnect"
          paragraph="Los siguientes términos y condiciones establecen el acuerdo legal entre BeatConnect y los usuarios del sitio web. Al acceder y utilizar el sitio web, usted acepta estos términos y condiciones en su totalidad. Si no está de acuerdo con estos términos y condiciones, por favor no utilice este sitio web. "
        >
          <p className="text-base-light color-neutral-black-900">
            <span className="text-titulo3-semibold text-red-700 ">
              Términos y condiciones
            </span>
            <br />
            <br />
            Bienvenido a nuestro sitio web. Si continúa navegando y utilizando
            este sitio web, acepta cumplir y estar sujeto a los siguientes
            términos y condiciones de uso, que junto con nuestra política de
            privacidad rigen la relación de BeatConnect con usted en
            relación con este sitio web.<br /><br />El término 'BeatConnect' o
            'nosotros' se refiere al propietario del sitio web. El término
            'usted' se refiere al usuario o visitante de nuestro sitio web. <br />El
            uso de este sitio web está sujeto a los siguientes términos de uso:<br /><br />
            El contenido de las páginas de este sitio web es solo para su
            información general y uso. Está sujeto a cambios sin previo aviso.
            Ni nosotros ni terceros proporcionamos ninguna garantía o garantía
            en cuanto a la precisión, puntualidad, rendimiento, integridad o
            idoneidad de la información y los materiales encontrados u ofrecidos
            en este sitio web para cualquier propósito en particular. <br /><br />Usted
            reconoce que dicha información y materiales pueden contener
            inexactitudes o errores y excluimos expresamente la responsabilidad
            por cualquier inexactitud o error en la máxima medida permitida por
            la ley. <br /><br />El uso de cualquier información o material en este sitio web
            es bajo su propio riesgo, por lo que no seremos responsables. Es su
            propia responsabilidad asegurarse de que cualquier producto,
            servicio o información disponible a través de este sitio web cumpla
            con sus requisitos específicos. <br /><br />Este sitio web contiene material que
            es propiedad nuestra o que tenemos licencia. Este material incluye,
            pero no se limita a, el diseño, la disposición, la apariencia, los
            gráficos y las fotografías. <br /><br />Queda prohibida la reproducción,
            distribución, exhibición, transmisión o uso no autorizado de este
            material. Todas las marcas registradas reproducidas en este sitio
            web, que no son propiedad del operador o están autorizadas, son
            reconocidas en el sitio web. <br /><br />El uso no autorizado de este sitio web
            puede dar lugar a una reclamación por daños y perjuicios y/o
            constituir un delito. <br /><br />Este sitio web también puede incluir enlaces a
            otros sitios web. Estos enlaces se proporcionan para su conveniencia
            para proporcionar más información. No significa que respaldemos el
            sitio web(s). <br /><br />No tenemos responsabilidad por el contenido del sitio
            web(s) vinculado(s). Su uso de este sitio web y cualquier disputa
            que surja del uso de este sitio web está sujeto a las leyes de Argentina. <br /><br />Al utilizar este sitio web, usted acepta estos términos y
            condiciones en su totalidad. Si no está de acuerdo con estos
            términos y condiciones o con cualquier parte de estos términos y
            condiciones, no use nuestro sitio web.
          </p>
        </HelpContainer>
      </Main>
    </>
  );
}
