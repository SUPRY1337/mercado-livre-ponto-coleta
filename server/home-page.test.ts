/** @vitest-environment jsdom */
import { createElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "../client/src/pages/Home";

afterEach(() => cleanup());

describe("página inicial BB", () => {
  it("apresenta a página institucional profissional", () => {
    render(createElement(Home));

    expect(screen.getAllByText("BANCO DO BRASIL").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /Mais perto do que importa para você/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Tudo para seguir em frente/i })).toBeTruthy();
    expect(screen.getByText(/não representa um canal oficial do Banco do Brasil/i)).toBeTruthy();
  });

  it("não contém formulário, campos pessoais, arquivos ou confirmação de envio", () => {
    const { container } = render(createElement(Home));

    expect(container.querySelector("form, input, textarea, select, video, [type='file']")).toBeNull();
    expect(screen.queryByText(/Enviado a OptaApp/i)).toBeNull();
    expect(screen.queryByText(/simular envio/i)).toBeNull();
  });
});
