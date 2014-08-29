define(['jquery'],
function($) {
    var Utils = function() {
        function formatWords(count, words) {
            var cnt = count.toString().substring(count.toString().length - 1, count.toString().length);
            if (cnt == 1) {
                return words[0];
            } else if (cnt > 1 && cnt < 5) {
                return words[1];
            } else return words[2];
        }

        return {
            formatWords: formatWords
        };
    }

    return new Utils();
});