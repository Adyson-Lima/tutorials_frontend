import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from '../../services/api';

export default function NewUpdate(){

  const [subject, setSubject] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  // tutorial_id definido na rota NewUpdate
  const {tutorial_id} = useParams();

  // recebe e manipula eventos do form
  async function saveOrUpdate(e){

    e.preventDefault();

    const data = {subject, author};

    if (tutorial_id === '0') {
      try {
        await api.post('api/v1/tutorials', data, {});
        navigate('/');
      } catch (error) {
        alert('erro ao salvar');        
      }      
    } else {
      try {
        await api.patch(`api/v1/tutorials/${tutorial_id}`, data, {});
        navigate('/');
      } catch (error) {
        alert('erro ao atualizar');        
      }      
    }
  }

  // busca registro expecifico na api e seta dados para atualização
  async function loadTutorial(){
    try {
      const response = await api.get(`api/v1/tutorials/${tutorial_id}`,{});
      setSubject(response.data.subject);
      setAuthor(response.data.author);
    } catch (error) {
      alert('erro ao buscar registro na api');
      navigate('/');      
    }
  }

  // chama loadTutorial e preenche form
  useEffect(() => {
    if (tutorial_id === '0') {
      return;      
    } else {
      loadTutorial();      
    }
  }, [tutorial_id]);

  return(

    <div data-testid="mycard" className="card border-primary" style={{marginTop: '20px'}} >
      <div className="card-header bg-primary" style={{color: '#fff'}}>
        Tutorials Crud
      </div>
      <div className="card-body">

        <Link data-testid="mylink" className="btn btn-dark" 
        style={{marginBottom: '5px'}} to="/">Home</Link>

        <form data-testid="myform" onSubmit={saveOrUpdate}>

          <div className="form-group">
            <label htmlFor="subject">Assunto</label>
            <input data-testid="input1" id="subject" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Assunto" value={subject}
            onChange={e => setSubject(e.target.value)}></input>
          </div>

          <div className="form-group">
            <label htmlFor="author">Autor</label>
            <input data-testid="input2" id="author" type="text" 
            style={{marginBottom: '20px'}} className="form-control" 
            placeholder="Autor" value={author}
            onChange={e => setAuthor(e.target.value)}></input>
          </div>

          <button data-testid="btnenviar" type="submit" className="btn btn-primary">Enviar</button>

        </form>

      </div>
    </div>

  );

}