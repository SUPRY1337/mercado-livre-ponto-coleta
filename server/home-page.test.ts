/** @vitest-environment jsdom */
import { createElement } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import Home from "../client/src/pages/Home";

afterEach(() => cleanup());

describe("página BB com seção cadastral OptaApp", () => {
  it("mantém a identidade visual BB e direciona o CTA aos campos", () => {
    render(createElement(Home));

    expect(screen.getAllByText("BANCO DO BRASIL").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /Mais perto do que importa para você/i })).toBeTruthy();
    const ctas = screen.getAllByRole("link", { name: /Conheça as soluções/i });
    expect(ctas.some((link) => link.getAttribute("href") === "#cadastro")).toBe(true);
    expect(screen.getByRole("heading", { name: /Dados cadastrais/i })).toBeTruthy();
    expect(screen.getAllByText("OptaApp").length).toBeGreaterThan(0);
  });

  it("apresenta os campos solicitados, mas não tem formulário ou ação de envio", () => {
    const { container } = render(createElement(Home));

    expect(screen.getByLabelText(/Nome completo/i)).toBeTruthy();
    expect(screen.getByLabelText(/^CPF$/i)).toBeTruthy();
    expect(screen.getByLabelText(/Data de nascimento/i)).toBeTruthy();
    const photo = screen.getByLabelText(/Foto do RG/i) as HTMLInputElement;
    expect(photo.type).toBe("file");
    expect(photo.accept).toContain("image/jpeg");
    expect(photo.accept).toContain("image/png");
    expect(photo.accept).toContain("image/webp");
    expect(photo.hasAttribute("capture")).toBe(false);
    expect(container.querySelector("form, button[type='submit']")).toBeNull();
    expect(screen.queryByText(/Enviado com sucesso|Enviado a OptaApp/i)).toBeNull();
  });
});
