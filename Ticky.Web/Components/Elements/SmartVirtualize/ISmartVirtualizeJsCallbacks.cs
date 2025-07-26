namespace Ticky.Web.Components.Elements.SmartVirtualize;

internal interface ISmartVirtualizeJsCallbacks
{
    void OnBeforeSpacerVisible(float spacerSize, float spacerSeparation, float containerSize);
    void OnAfterSpacerVisible(float spacerSize, float spacerSeparation, float containerSize);
}
