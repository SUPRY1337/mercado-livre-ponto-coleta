/** @vitest-environment jsdom */
import { createElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Home from "../client/src/pages/Home";

beforeEach(() => {
  vi.stubGlobal("URL", {
    createObjectURL: vi.fn(() => "blob:fake-rg-image"),
    revokeObjectURL: vi.fn(),
  });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("página BB com formulário de simulação local", () => {
  it("apresenta identidade profissional e aviso para usar somente dados fictícios", () => {
    render(createElement(Home));

    expect(screen.getAllByText("BANCO DO BRASIL").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: /Mais perto do que importa para você/i })).toBeTruthy();
    expect(screen.getByText(/Ambiente de simulação — use somente dados fictícios/i)).toBeTruthy();
    expect(screen.getByText(/não representa um canal oficial do Banco do Brasil/i)).toBeTruthy();
  });

  it("exibe nome, CPF, data de nascimento e seleção de RG sem abrir câmera", () => {
    render(createElement(Home));

    expect(screen.getByLabelText(/Nome completo/i)).toBeTruthy();
    expect(screen.getByLabelText(/^CPF/i)).toBeTruthy();
    expect(screen.getByLabelText(/Data de nascimento/i)).toBeTruthy();
    const fileInput = screen.getByLabelText(/Selecionar imagem do RG/i) as HTMLInputElement;
    expect(fileInput.type).toBe("file");
    expect(fileInput.accept).toContain("image/jpeg");
    expect(fileInput.accept).toContain("image/png");
    expect(fileInput.accept).toContain("image/webp");
    expect(fileInput.hasAttribute("capture")).toBe(false);
    expect(document.querySelector("video")).toBeNull();
  });

  it("mostra prévia local e confirma a simulação sem transmitir os dados", () => {
    render(createElement(Home));

    fireEvent.change(screen.getByLabelText(/Nome completo/i), { target: { value: "Pessoa Fictícia" } });
    fireEvent.change(screen.getByLabelText(/^CPF/i), { target: { value: "12345678901" } });
    fireEvent.change(screen.getByLabelText(/Data de nascimento/i), { target: { value: "1990-01-01" } });
    const file = new File(["imagem fictícia"], "rg-ficticio.webp", { type: "image/webp" });
    fireEvent.change(screen.getByLabelText(/Selecionar imagem do RG/i), { target: { files: [file] } });

    expect(screen.getByAltText(/Prévia da imagem fictícia rg-ficticio.webp/i)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /Continuar simulação/i }));

    expect(screen.getByRole("heading", { name: "Enviado a OptaApp" })).toBeTruthy();
    expect(screen.getByRole("status").textContent).toMatch(/Simulação local concluída\. Nenhum dado ou arquivo foi transmitido ou armazenado/i);
    expect(screen.queryByDisplayValue(/Pessoa Fictícia|123\.456\.789-01|1990-01-01/)).toBeNull();
  });

  it("rejeita formatos de arquivo que não sejam JPEG, PNG ou WEBP", () => {
    render(createElement(Home));
    const pdf = new File(["conteúdo"], "arquivo.pdf", { type: "application/pdf" });

    fireEvent.change(screen.getByLabelText(/Selecionar imagem do RG/i), { target: { files: [pdf] } });

    expect(screen.getByText(/Escolha uma imagem JPG, PNG ou WEBP/i)).toBeTruthy();
    expect(screen.getByRole("button", { name: /Continuar simulação/i }).hasAttribute("disabled")).toBe(true);
  });
});
