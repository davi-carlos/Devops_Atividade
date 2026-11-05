import { DESTINOS } from "./destinos.js";
import { filtrarDestinos, valoresUnicos } from "./filtros.js";

const lista = document.getElementById("lista-destinos");
const contador = document.getElementById("contador");
const campoBusca = document.getElementById("busca");
const seletorRegiao = document.getElementById("regiao");
const seletorTipo = document.getElementById("tipo");
const dialogo = document.getElementById("detalhes");

function preencherSelect(select, valores) {
  for (const valor of valores) {
    const opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = valor;
    select.append(opcao);
  }
}

function criarCard(destino) {
  const card = document.createElement("article");
  card.className = "card";

  const capa = document.createElement("div");
  capa.className = "card-capa";
  capa.style.background = `linear-gradient(135deg, ${destino.cores[0]}, ${destino.cores[1]})`;
  const selo = document.createElement("span");
  selo.className = "selo";
  selo.textContent = destino.tipo;
  const uf = document.createElement("span");
  uf.className = "uf";
  uf.textContent = destino.estado;
  capa.append(selo, uf);

  const corpo = document.createElement("div");
  corpo.className = "card-corpo";
  const titulo = document.createElement("h3");
  titulo.textContent = destino.nome;
  const regiao = document.createElement("p");
  regiao.className = "regiao";
  regiao.textContent = `Região ${destino.regiao}`;
  const descricao = document.createElement("p");
  descricao.textContent = destino.descricao;
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "botao";
  botao.textContent = "Ver detalhes";
  botao.addEventListener("click", () => abrirDetalhes(destino));
  corpo.append(titulo, regiao, descricao, botao);

  card.append(capa, corpo);
  return card;
}

function abrirDetalhes(destino) {
  dialogo.querySelector("h3").textContent = `${destino.nome} (${destino.estado})`;
  dialogo.querySelector(".descricao").textContent = destino.descricao;
  dialogo.querySelector(".epoca").textContent = destino.melhorEpoca;
  const ul = dialogo.querySelector("ul");
  ul.replaceChildren(
    ...destino.destaques.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );
  dialogo.showModal();
}

function renderizar() {
  const resultado = filtrarDestinos(DESTINOS, {
    busca: campoBusca.value,
    regiao: seletorRegiao.value,
    tipo: seletorTipo.value,
  });
  lista.replaceChildren(...resultado.map(criarCard));
  contador.textContent =
    resultado.length === 1 ? "1 destino encontrado" : `${resultado.length} destinos encontrados`;
}

preencherSelect(seletorRegiao, valoresUnicos(DESTINOS, "regiao"));
preencherSelect(seletorTipo, valoresUnicos(DESTINOS, "tipo"));
document.querySelector(".filtros").addEventListener("submit", (e) => e.preventDefault());
campoBusca.addEventListener("input", renderizar);
seletorRegiao.addEventListener("change", renderizar);
seletorTipo.addEventListener("change", renderizar);
dialogo.querySelector(".fechar").addEventListener("click", () => dialogo.close());
document.getElementById("ano").textContent = String(new Date().getFullYear());
renderizar();
