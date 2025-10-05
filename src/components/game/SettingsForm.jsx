import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import Button from "../ui/Button";
import { useSettingsStore } from "../../stores/useSettingsStore";
import "./SettingsForm.css";

const SettingsForm = ({ onClose }) => {
  const { boardSize, winningLength, setSettings } = useSettingsStore();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      boardSize,
      winningLength,
    },
  });

  const formBoardSize = useWatch({
    control,
    name: "boardSize",
    defaultValue: boardSize,
  });

  useEffect(() => {
    const currentBoardSize = parseInt(formBoardSize) || boardSize;
    const currentWinningLength = parseInt(winningLength) || winningLength;

    if (currentWinningLength > currentBoardSize) {
      setValue("winningLength", currentBoardSize);
    }
  }, [formBoardSize, winningLength, setValue, boardSize]);

  const onSubmit = (data) => {
    setSettings({
      boardSize: parseInt(data.boardSize),
      winningLength: parseInt(data.winningLength),
    });
    onClose();
  };

  const getMaxWinningLength = () => {
    return parseInt(formBoardSize) || boardSize;
  };

  const maxWinningLength = getMaxWinningLength();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="settings-form">
      <h2>Налаштування гри</h2>

      <div className="form-group">
        <label htmlFor="boardSize">Розмір поля:</label>
        <select
          id="boardSize"
          {...register("boardSize", {
            required: "Оберіть розмір поля",
            min: { value: 3, message: "Мінімальний розмір - 3" },
            max: { value: 10, message: "Максимальний розмір - 10" },
          })}
        >
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
          <option value={6}>6x6</option>
          <option value={7}>7x7</option>
          <option value={8}>8x8</option>
          <option value={9}>9x9</option>
          <option value={10}>10x10</option>
        </select>
        {errors.boardSize && (
          <span className="error">{errors.boardSize.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="winningLength">
          Умова перемоги (символів поспіль):
        </label>
        <input
          type="number"
          id="winningLength"
          min="3"
          max={maxWinningLength}
          {...register("winningLength", {
            required: "Введіть умову перемоги",
            min: {
              value: 3,
              message: "Мінімум 3 символи",
            },
            max: {
              value: maxWinningLength,
              message: `Максимум ${maxWinningLength} символів для поля ${maxWinningLength}x${maxWinningLength}`,
            },
            validate: {
              notGreaterThanBoard: (value) =>
                parseInt(value) <= maxWinningLength ||
                `Умова перемоги не може бути більшою за розмір поля`,
            },
          })}
        />
        {errors.winningLength && (
          <span className="error">{errors.winningLength.message}</span>
        )}
      </div>

      <div className="form-actions">
        <Button type="submit" variant="primary">
          Зберегти
        </Button>
        <Button type="button" onClick={onClose} variant="secondary">
          Скасувати
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
