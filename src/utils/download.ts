/**
 * Lance le téléchargement d'un fichier servi par le site, comme le ferait un
 * lien `download`. Le lien est rattaché au document le temps du clic, ce que
 * certains navigateurs exigent pour déclencher le téléchargement.
 */
export const downloadFile = (url: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = "";
  document.body.append(link);
  link.click();
  link.remove();
};
