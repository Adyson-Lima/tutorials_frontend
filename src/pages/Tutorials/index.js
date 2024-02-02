import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function Tutorials(){

  const [my_tutorials, setTutorials] = useState([]);
  const navigate = useNavigate();

  // read, busca todos os registros na api
  useEffect(() => {
    api.get('api/v1/tutorials',{})
    .then(response => {setTutorials(response.data)})
  }, []);

  // update, navega para NewUpdate
  async function updateTutorial(id){
    try {
      navigate(`/newupdate/${id}`);
    } catch (error) {
      alert('Erro ao acessar NewUpdate');
    }
  }

  // delete, exclui um registro na api
  async function deleteTutorial(id){
    try {
      await api.delete(`api/v1/tutorials/${id}`,{});
      setTutorials(my_tutorials.filter(tutorial => tutorial.id !== id));
    } catch (error) {
      alert('erro ao excluir elemento');      
    }
  }

  return(

    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Tutorials Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-success" 
        style={{marginBottom: '10px'}} to="/newupdate/0">Novo</Link>

        <table data-testid="mytable" className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Assunto</th>
              <th scope="col">Autor</th>
              <th scope="col">Ações</th>
            </tr>
          </thead>
          <tbody>
            {my_tutorials.map(tutorial => (
              <tr key={tutorial.id}>
                <th scope="row">{tutorial.id}</th>
                <td>{tutorial.subject}</td>
                <td>{tutorial.author}</td>
                <td>

                  <button data-testid="mybtn1" type="button"
                  className="btn btn-outline-info" style={{margin: '2px'}}
                  onClick={() => updateTutorial(tutorial.id)}>Editar</button>

                  <button data-testid="mybtn2" type="button"
                  className="btn btn-outline-danger" style={{margin: '2px'}}
                  onClick={() => deleteTutorial(tutorial.id)}>Excluir</button>

                </td>
              </tr>
            ))}
            
          </tbody>
        </table>

      </div>
    </div>

  );

}