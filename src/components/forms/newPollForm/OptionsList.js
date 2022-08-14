import Option from "./Option";
const OptionList = (props) => {
  const optionList = props.options.map((option, index) => {
    return (
      <Option
        key={index}
        deleteOption={props.deleteOption}
        text={option.text}
        id={option.id}
      />
    );
  });
  return <ul className="flex flex-col">{optionList}</ul>;
};
export default OptionList;
