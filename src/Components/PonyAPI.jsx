import { useState } from "react";
import css from "./PonyAPI.module.css";
import axios from "axios";

export function PonyAPI() {
     // Estados do ID, Pony e erro
     const [id, setId] = useState("");
     const [pony, setPony] = useState(null);
     const [erro, setErro] = useState(null);

     // Função que busca o Pony digitado pelo ID
     async function ObterUnicornio() {
          // Verificando se o usuário não digitou o ID ou se digitou menor que zero
          if (!id || parseInt(id) <= 0) {
               alert("Digite um ID válido.");
               setId("");

               return;
          }
          try {
               const response = await axios.get(`http://ponyapi.net/v1/character/${id}`)
     
               setPony(response.data);
               setErro(null);
          }
          catch(error) {
               console.error("Erro ao buscar Pony: ", error.response?.data);

               setErro("Pony não encontrado.");
               setPony(null);
          }
     }

     return (
          <main>
               <section className={css.container}>
                    {/* API do MyLittlePony */}
                    <section className={css.api}>
                         <div className={css.apiInformacoes}>
                              <h1>🦄 API do My Little Pony 🦄</h1>
                              {/* Mini formulário para o ID */}
                              <form>
                                   <label htmlFor="pony" style={{ fontSize:"20px" }}>Digite o ID do Pony:</label> <br />
                                   <input type="number" name="pony" id="idPony" value={id} onChange={(e) => setId(e.target.value)} minLength={1} placeholder="Digite o ID" /> <br />
                                   <div className={css.botao}>
                                        <button type="button" onClick={ObterUnicornio}>Buscar</button>
                                   </div>
                                   {erro && <p>{erro}</p>}
                              </form>
                              {/* Exibindo as informações do Pony */}
                              {pony && (
                                   <div className={css.informacoes}>
                                        <h2>Informações do Pony</h2>
                                        <table>
                                             <thead>
                                                  <tr>
                                                       <th>Nome</th>
                                                       <th>Apelido</th>
                                                       <th>Sexo</th>
                                                       <th>Onde vive</th>
                                                       <th>Ocupação</th>
                                                       <th>Tipo</th>
                                                  </tr>
                                             </thead>
                                             <tbody> 
                                                  <tr>
                                                       <td>{pony.data[0].name}</td>
                                                       <td>{pony.data[0].alias}</td>
                                                       <td>{pony.data[0].sex}</td>
                                                       <td>{pony.data[0].residence}</td>
                                                       <td>{pony.data[0].occupation}</td>
                                                       <td>{pony.data[0].kind?.join(", ")}</td>
                                                  </tr>
                                             </tbody>
                                        </table>
                                        <div className={css.imagemPony}>
                                             <h2>Foto</h2>
                                             <img src={pony.data[0].image[0]} alt="Imagem do pony" />
                                        </div>
                                   </div>
                              )}
                         </div>
                    </section>
               </section>
          </main>
     )
}
