// ? Esse arquivo pode ser substituido durante o processo de build.
// ? Quando a build for em produção, passará a ser válido o `environment.prod.ts`.
// ? A lista de substituições de arquivos pode ser encontrada em `angular.json`.

export const environment = {
  production: false,
  base_url: "https://service.noclaftech.com.br/",
  page_size: 10,
};

/*
 * Para facilitar a depuração no modo de desenvolvimento, você pode importar o seguinte arquivo
 * para ignorar os quadros de pilha de erros relacionados à zona, como `zone.run`, `zoneDelegate.invokeTask`.
 *
 * Essa importação abaixo deve ser comentada no modo de produção, pois terá um impacto negativo
 * no desempenho se for lançado um erro.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
