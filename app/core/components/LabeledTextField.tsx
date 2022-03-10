import { forwardRef, ComponentPropsWithoutRef, PropsWithoutRef } from "react"
import { useField, UseFieldConfig } from "react-final-form"

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements["input"]> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: "text" | "password" | "email" | "number"
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
  labelProps?: ComponentPropsWithoutRef<"label">
  fieldProps?: UseFieldConfig<string>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    })

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError

    return (
      <div {...outerProps} className={`mb-6 ${outerProps?.className || ""}`}>
        <label {...labelProps} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
        <input
          {...input}
          disabled={submitting}
          {...props}
          ref={ref}
          className={`
          shadow appearance-none
          border rounded
          w-full py-2 px-3
          text-gray-700 leading-tight
          focus:outline-none focus:shadow-outline
          ${touched && normalizedError ? "border-red-500" : ""}
          `}
        />

        {touched && normalizedError && (
          <div role="alert" className="text-red-500 text-xs italic">
            {normalizedError}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
