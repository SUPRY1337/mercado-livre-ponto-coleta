/** @vitest-environment jsdom */
import { createElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "../client/src/pages/Home";

afterEach(() => cleanup());

describe("página inicial BB", () => {
  it("apresenta a identidade visual e o conteúdo institucional", () => {
    render(createElement(Home));

    expect(screen.getAllByText("BANCO DO BRASIL").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /Mais perto do que importa para você/i })).toBeTruthy();
    expect(screen.getByRole("heading", { name: /Tudo para seguir em frente/i })).toBeTruthy();
    expect(screen.getByText(/não representa um canal oficial do Banco do Brasil/i)).toBeTruthy();
  });

  it("não apresenta campos, login, upload ou captura de imagem", () => {
    const { container } = render(createElement(Home));

    expect(container.querySelector("form, input, textarea, select, video, [type='file']")).toBeNull();
  });
});
