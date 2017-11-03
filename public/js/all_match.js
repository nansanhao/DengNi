function loading() {
    $(function () {
        $(".matchButton").hide();
        $(".spinner").show();
        setTimeout(function () {
            $(".spinner").hide();
            $(".matchResult").show();

        },3000)

    })
}

function loadingAgain() {
    $(function () {
        $(".matchResult").hide();
        $(".spinner").show();
        setTimeout(function () {
            $(".spinner").hide();
            $(".matchResult").show();

        },3000)
    })
}

function confirmJoin() {

}