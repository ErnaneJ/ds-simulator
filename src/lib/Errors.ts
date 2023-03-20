interface ErrorBaseParams{
  setToastOpen:(status:boolean) => void
  setTitleToast:(title:string) => void
  setDescriptionToast:(description:string) => void
}

interface objectTypeErrorParams extends ErrorBaseParams{
  objectType:string,
}

interface invalidIndexErrorParams extends ErrorBaseParams{
  indexToChange : number,
  nodesLength : number
}
export function objectType({
  objectType, 
  setToastOpen,
  setTitleToast,
  setDescriptionToast}:objectTypeErrorParams):boolean{
  if(!objectType){
    setToastOpen(true);
    setTitleToast('Opss..! Tipo de lista inválido.');
    setDescriptionToast('Selecione correntamente — no canto superior esquerdo —, o tipo de lista que deseja utilizar.');

    return true;
  }

  return false;
}

export function invalidIndex({
  indexToChange,
  nodesLength,
  setToastOpen,
  setTitleToast,
  setDescriptionToast
}:invalidIndexErrorParams):boolean{
  if(indexToChange < -1 || indexToChange >= nodesLength) {
    setToastOpen(true);
    setTitleToast('Opss..! Indice inválido.');
    setDescriptionToast('O indice deve ser um número inteiro entre -1 e o tamanho da lista.');

    return true;
  }

  return false;
}