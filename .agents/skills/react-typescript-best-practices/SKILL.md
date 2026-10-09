---
name: react-typescript-best-practices
description: >-
  Provides best practices, conventions, patterns, and rationales for React with TypeScript
  based on the React TypeScript Cheatsheet (https://github.com/typescript-cheatsheets/react).
  Use whenever the user asks for React + TypeScript best practices, typing props, typing hooks,
  events, ref handling, or the architectural reasoning behind React and TypeScript decisions.
---

# React + TypeScript Best Practices (Cheatsheet Reference)

Esta skill proporciona las convenciones, patrones recomendados y justificaciones arquitectónicas para proyectos de React con TypeScript, basados en [React TypeScript Cheatsheet](https://github.com/typescript-cheatsheets/react).

---

## 1. Declaración de Componentes y Props

### Recomendación principal: Funciones normales con inferencia de retorno
```tsx
type ButtonProps = {
  label: string;
  onClick: () => void;
};

// ✅ Recomendado: función tipada en el argumento
export const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

### ¿Por qué evitar `React.FC` (`React.FunctionComponent`)?
- Históricamente inyectaba `children` de forma implícita (incluso en componentes que no deberían recibir hijos).
- Genera fricción y sintaxis innecesariamente compleja con componentes genéricos (`<T>`).
- Complica el uso de `defaultProps` y la inferencia directa de TypeScript.
- **Consenso moderno:** Usar funciones estándar tipando directamente el objeto de `props`.

---

## 2. `type` vs `interface` para Props y Estado

### Regla de oro:
1. **Usa `type` para Props y State internos de tu aplicación:**
   - Es más estricto y predecible.
   - Permite uniones (`type Status = "idle" | "loading"`), uniones discriminadas y tuplas.
2. **Usa `interface` si estás creando una librería o API pública:**
   - Permite *declaration merging* para que los consumidores de tu librería puedan extender las propiedades si lo necesitan.

---

## 3. Catálogo de Tipado de Props

```tsx
type ExampleProps = {
  // Primitivos
  count: number;
  message: string;
  isActive: boolean;

  // Arrays
  list: string[];
  userList: User[];

  // Literales y Uniones (preferido sobre enums)
  status: "pending" | "fulfilled" | "rejected";

  // Objetos y Diccionarios
  user: { id: string; name: string };
  recordMap: Record<string, number>;

  // Funciones
  onSimpleClick: () => void;
  onParamClick: (id: string) => void;

  // Eventos de React
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;

  // Props opcionales
  disabled?: boolean;

  // Setter de estado recibido desde el padre
  setValue: React.Dispatch<React.SetStateAction<string>>;
};
```

---

## 4. Tipos Especiales de React

### A. Para `children`: `React.ReactNode`
- **Siempre preferir `React.ReactNode`**: Acepta cualquier cosa que React pueda renderizar (JSX, strings, números, fragments, `null`, portales).
- Usar `React.ReactElement` o `React.JSX.Element` **solo** cuando se requiera estrictamente que el hijo sea exactamente un único elemento JSX.

### B. Para estilos: `React.CSSProperties`
```tsx
type CardProps = {
  style?: React.CSSProperties;
};
```

### C. Envolver elementos HTML nativos (Polimorfismo / Wrappers)
Cuando se crea un componente que extiende un elemento HTML nativo:
```tsx
// Extiende todos los atributos nativos de <button> sin conflictos de ref
type CustomButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export const CustomButton = ({ variant = "primary", className, ...props }: CustomButtonProps) => {
  return <button className={`btn ${variant} ${className ?? ""}`} {...props} />;
};
```

---

## 5. Antipatrones comunes a evitar

| Antipatrón | ¿Por qué falla o es riesgoso? | Alternativa correcta |
| :--- | :--- | :--- |
| `obj: object` | Representa "cualquier valor no primitivo". No permite acceder a ninguna propiedad. | `{ id: string }` o `Record<string, unknown>` |
| `obj: {}` o `Object` | Representa "cualquier valor no nulo" (¡acepta números, strings y booleanos!). | Tipar propiedades explícitas |
| `fn: Function` | Acepta cualquier llamada sin validar tipos ni argumentos (bypassa el chequeo de TS). | `() => void` o la firma exacta |
| `React.FC` | Sobrecarga innecesaria, problemas con tipos genéricos. | `({ prop }: Props)` |

---

## 6. Buenas Prácticas con Hooks

### `useState`
- Inferencia automática para valores primitivos: `const [count, setCount] = useState(0)`
- Tipado explícito con unión para valores iniciales nulos:
  ```tsx
  const [user, setUser] = useState<User | null>(null);
  ```

### `useRef`
- Para elementos del DOM: tipar el elemento HTML exacto y usar `null` como valor inicial:
  ```tsx
  const inputRef = useRef<HTMLInputElement>(null);
  ```
- Para valores mutables que no provocan re-render:
  ```tsx
  const timerRef = useRef<number | null>(null);
  ```

### Custom Hooks con arrays de retorno
- Usar `as const` para preservar la tupla posicional:
  ```tsx
  export const useToggle = (initial = false) => {
    const [state, setState] = useState(initial);
    const toggle = () => setState(prev => !prev);
    return [state, toggle] as const; // Infers [boolean, () => void]
  };
  ```

---

## 7. Integración con TanStack React Query

- **Queries (`useQuery`)**: Son declarativas. Sus dependencias deben viajar en la firma del hook y en la `queryKey`:
  ```tsx
  export const useUsers = (filters: FilterParams) => {
    return useQuery({
      queryKey: ["users", filters],
      queryFn: () => fetchUsers(filters),
    });
  };
  ```
- **Mutaciones (`useMutation`)**: Son imperativas. El hook no recibe parámetros iniciales; las variables se envían al disparar `mutate(variables)`:
  ```tsx
  export const useCreateUser = () => {
    return useMutation<UserResponse, ApiError, CreateUserInput>({
      mutationFn: (newUser) => createUserApi(newUser),
    });
  };
  ```
