package dto;

public class OptionMaterialStockDto {
    private int materialCode;
    private int materialGroupId;
    private String materialName;
    private int deductQty;
    private double currentQty;
    private int unavailableYn;
    private int addUnavailableYn;

    public int getMaterialCode() {
        return materialCode;
    }

    public void setMaterialCode(int materialCode) {
        this.materialCode = materialCode;
    }

    public int getMaterialGroupId() {
        return materialGroupId;
    }

    public void setMaterialGroupId(int materialGroupId) {
        this.materialGroupId = materialGroupId;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public int getDeductQty() {
        return deductQty;
    }

    public void setDeductQty(int deductQty) {
        this.deductQty = deductQty;
    }

    public double getCurrentQty() {
        return currentQty;
    }

    public void setCurrentQty(double currentQty) {
        this.currentQty = currentQty;
    }

    public int getUnavailableYn() {
        return unavailableYn;
    }

    public void setUnavailableYn(int unavailableYn) {
        this.unavailableYn = unavailableYn;
    }

    public int getAddUnavailableYn() {
        return addUnavailableYn;
    }

    public void setAddUnavailableYn(int addUnavailableYn) {
        this.addUnavailableYn = addUnavailableYn;
    }
}