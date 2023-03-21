import { createContext, useContext } from "react";
import { useRouter } from "next/router";
import es from "../translations/es.json";
import en from "../translations/en.json";

const I18NContext = createContext();

const languages = { es, en };

export function I18NProvider({ children }) {
  const { locale } = useRouter();

  const t = (key, ...args) => {
    let translation = languages[locale][key];
    if (!args.length) return translation;

    // para no usar objectos para traducir
    // se puede usar regex para hacer esto, pero asi es mas facil de entender
    args.forEach((value, index) => {
      console.log(value);
      translation = translation.replace(`\${${index + 1}}`, value);
    }); //puedes dejarlo cero pero como colocastes: ${1} results for ${2}, el 1 y el 2 es la posicion del array, por eso se coloca index+1
    // tbm se puede usar esto: "SEARCH_RESULTS_TITLE": "%1 results for %2" en vez de esto: "SEARCH_RESULTS_TITLE": "${1} results for ${2}"
    //wao esto esta increible esta logica de traduccion. buena practica. esto es lo que dice copilot: pero no, no es buena practica. porque si tienes 1000 traducciones y tienes que hacer esto, es una mala practica. por eso se usa objectos para traducir. pero bueno, esta es una buena practica para aprender. pero no se usara en el proyecto. pero esta muy bien. esta es una buena practica para aprender.

    return translation;
  };

  return <I18NContext.Provider value={{ t }}>{children}</I18NContext.Provider>;
}

//usaremos un custom hooks:
export function useI18N() {
  //aqui recuperas el contexto del I18NContext con el hook useContext
  const context = useContext(I18NContext);
  if (context === undefined) {
    throw new Error("useI18N must be used within a I18NProvider"); //con esto permitimos que alguien que no sepa este hooks le devuelve este error. de esta manera se usara el hooks correctamente. si no se usa dentro del provider se mostrara este error. en otras palabras en este caso siempre tendras que usar el provider I18NProvider con el hooks useI18N.
  }
  return context;
}
