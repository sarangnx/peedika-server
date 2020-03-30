
module.exports = {
    about(req, res, next) {
        res.json({
            status: 'success',
            about: `Peedika is an online shopping portal developed with social commitments ` +
                `to meet the needs of the people who are keeping social distance. ` +
                `It's a joint venture of Daflow, a start up company of College ` + 
                `of Engineering Thalassery and Dockfox, The IT Professionals. \n\n` + 
                `സമൂഹ അകലം പാലിക്കുന്ന പൊതു ജനങ്ങൾക്ക് വേണ്ടി സാമൂഹിക പ്രതിബദ്ധതയോടെ നിർമിച്ച ` +
                `ഓൺലൈൻ ഷോപ്പിംഗ് പോർട്ടലാണ് പീടിക . തലശ്ശേരി എഞ്ചിനീയറിംഗ് കോളേജിലെ സ്റ്റാർട്ട് അപ് സംരംഭമായ ` +
                `Daflow യും Docfox എന്ന IT സ്ഥാപനവും സംയുക്ത മായാണ് പീടിക തയ്യാറാക്കിയിരിക്കുന്നത്\n\n` +
                `Email us at:peedia@daflow.in\ndockfoxindia@gmail.com`
        });
    }
}