import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Tutorials from '../pages/Tutorials';

describe('Testes da tela Tutorials', () => {

  beforeEach(() => {
    render(
      <BrowserRouter>
        <Tutorials/>
      </BrowserRouter>
    );
  });

  it('Existe card em Tutorials?', () => {
    expect(screen.getByTestId('mycard')).toBeInTheDocument();
  });

  it('Existe link Novo em Tutorials?', () => {
    expect(screen.getByTestId('mylink')).toBeInTheDocument();
  });

  it('Existe tabela em Tutorials?', () => {
    expect(screen.getByTestId('mytable')).toBeInTheDocument();
  });

});