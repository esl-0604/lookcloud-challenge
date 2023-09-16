interface TextBoxProps {
	text: string
}
export default function TextBox({ text }: TextBoxProps) {
	return (
		<div className="flex justify-center items-center w-[100%] h-[120px] text-[24px] font-textBoxFont">
			<span>{text}</span>
		</div>
	)
}
