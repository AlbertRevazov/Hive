const { UserAuthProviders } = require('../db/models');

async function getInternalId(externalId) {
    const authProvider = await UserAuthProviders.findOne({
        where: { providerId: externalId },
        include: ['user'],
    });

    if (authProvider) {
        return authProvider.user.id;
    }

    return externalId;
}
module.exports = { getInternalId };
