/** @vitest-environment jsdom */
import { createElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Home from "../client/src/pages/Home";

afterEach(() => cleanup());

describe("protótipo acadêmico Banco do Brasil", () => {
  it("identifica-se visivelmente como simulação não oficial", () => {
    render(createElement(Home));

    expect(screen.getByRole("note", { name: /Aviso de projeto acadêmico/i })).toBeTruthy();
    expect(screen.getByText(/demonstração não oficial · sem vínculo com o Banco do Brasil/i)).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Uma experiência digital em estudo/i })).toBeTruthy();
  });

  it("não contém formulários, entradas, uploads ou campos de dados pessoais", () => {
    const { container } = render(createElement(Home));

    expect(container.querySelector("form")).toBeNull();
    expect(container.querySelector("input, textarea, select")).toBeNull();
    expect(container.querySelector("video")).toBeNull();
    expect(container.querySelector("[type='file']")).toBeNull();
    expect(screen.getByText(/não contém cadastro, login, upload, transações/i)).toBeTruthy();
  });

  it("inicia e reinicia somente a demonstração local no navegador", () => {
    render(createElement(Home));

    fireEvent.click(screen.getByRole("button", { name: /Iniciar percurso/i }));
    expect(screen.getByRole("status").textContent).toMatch(/Nenhuma informação foi solicitada ou enviada/i);
    expect(screen.getByRole("button", { name: /Reiniciar/i })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /Reiniciar/i }));
    expect(screen.queryByRole("status")).toBeNull();
  });
});
